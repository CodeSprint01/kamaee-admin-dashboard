import React, { useEffect, useState } from "react";
import { Card } from "@material-tailwind/react";
import { AiOutlinePlus } from "react-icons/ai";
import DataTable from "./DataTable";
import axios from "axios";
import EditModal from "./EditModal";
import AlertModal from "./AlertModal";

const SubCategory = () => {
  const [tableRows, setTableRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryTitle, setSubCategoryTitle] = useState("");

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.kamaee.pk/api/subcategories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const subcategories = response.data.subcategory.map((item) => ({
          id: item.id,
          subcategory_title: item.subcategory_title,
          category: item.category.category_name,
          created_at: item.created_at,
        }));

        setTableRows(subcategories);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching subcategories:",
          error.response ? error.response.data : error.message
        );
        setError("Error fetching subcategories");
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://api.kamaee.pk/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(response.data.category)) {
          setCategories(response.data.category);
        } else {
          console.error(
            "Unexpected categories format:",
            response.data.category
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchSubCategories();
    fetchCategories();
  }, [token]);

  const handleAddCategory = () => {
    setIsAlertOpen(true);
  };

  const handleEdit = (row) => {
    if (row && row.id && row.subcategory_title) {
      setEditData(row);
      setSelectedCategory(row.category_id); // Assuming category_id is returned in the response
      setIsModalOpen(true);
    } else {
      console.error("Invalid subcategory data:", row);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await axios.delete(`https://api.kamaee.pk/api/subcategories/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTableRows((prevRows) => prevRows.filter((row) => row.id !== id));
      } catch (error) {
        console.error(
          "Error deleting subcategory:",
          error.response ? error.response.data : error.message
        );
        setError("Error deleting subcategory");
      }
    }
  };

  const handleModalSubmit = (updatedData) => {
    setTableRows((prevRows) =>
      prevRows.map((row) =>
        row.id === updatedData.id
          ? {
              ...row,
              subcategory_title: updatedData.subcategory_title,
              category: updatedData.category_name, // Updated to display category name correctly
            }
          : row
      )
    );
    setIsModalOpen(false);
  };

  const handleAddSubCategory = async () => {
    if (!selectedCategory || !subCategoryTitle) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.kamaee.pk/api/subcategory",
        {
          subcategory_title: subCategoryTitle,
          category_id: parseInt(selectedCategory), // Ensure category ID is a number
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          maxBodyLength: Infinity,
        }
      );

      setTableRows((prevRows) => [
        ...prevRows,
        {
          id: response.data.subcategory.id,
          subcategory_title: subCategoryTitle,
          category: response.data.subcategory.category.category_name,
        },
      ]);
      setIsAlertOpen(false);
      setSelectedCategory("");
      setSubCategoryTitle("");
    } catch (error) {
      console.error(
        "Error adding subcategory:",
        error.response ? error.response.data : error.message
      );
      setError(
        "Error adding subcategory: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  if (loading) {
    return <div>Loading subcategories...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="relative">
      <Card className="h-full w-full mt-10 overflow-scroll">
        <DataTable rows={tableRows} onEdit={handleEdit} onDelete={handleDelete} />
      </Card>
      <div className="fixed bottom-6 right-6 group">
        <button
          className="relative bg-[#0054ba] text-white font-semibold w-16 h-16 rounded-full flex items-center justify-center hover:bg-blue-600"
          onClick={handleAddCategory}
        >
          <AiOutlinePlus size={30} />
          <span className="absolute bottom-full mb-2 w-max p-2 text-xs text-white bg-[#0054ba] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Add New Subcategory
          </span>
        </button>
      </div>

      {isModalOpen && (
        <EditModal
          subcategory={editData}
          categories={categories} // Pass categories to EditModal
          onSubmit={handleModalSubmit}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isAlertOpen && (
        <AlertModal
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          subCategoryTitle={subCategoryTitle}
          setSubCategoryTitle={setSubCategoryTitle}
          onSubmit={handleAddSubCategory}
          onClose={() => setIsAlertOpen(false)}
        />
      )}
    </div>
  );
};

export default SubCategory;
