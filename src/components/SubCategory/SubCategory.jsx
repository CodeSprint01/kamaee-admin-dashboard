import React, { useEffect, useState } from "react";
import { Card } from "@material-tailwind/react";
import { AiOutlinePlus } from "react-icons/ai";
import DataTable from "./DataTable";
import axios from "axios";
import EditModal from "./EditModal";
import AlertModal from "./AlertModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal"; 

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null); 
  const [deleteName, setDeleteName] = useState(""); 

  const token = localStorage.getItem("authToken");

  const handleApi = () => {
    const URL = "https://api.kamaee.pk/api/subcategory";
    const token = localStorage.getItem("authToken");

    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  
  const bodyParameters = {
    subcategory_title: subCategoryTitle,
    category_id: Number(selectedCategory)
  };
  axios.post( 
    URL,
    bodyParameters,
    config
  ).then(response => {
    console.log("response", response)
 }) 
 .catch(err => {
    console.log("err", err);
 });
    

  };


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
        const response = await axios.get(
          "https://api.kamaee.pk/api/categories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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
    document.body.style.overflow = "hidden"; 
  };

  const handleEdit = (row) => {
    if (row && row.id && row.subcategory_title) {
      setEditData(row);
      setSelectedCategory(row.category_id); 
      setIsModalOpen(true);
      document.body.style.overflow = "hidden"; 
    } else {
      console.error("Invalid subcategory data:", row);
    }
  };

  const handleDeleteClick = (id, name) => {
    setDeleteId(id); 
    setDeleteName(name);
    setIsDeleteModalOpen(true); 
    document.body.style.overflow = "hidden"; 
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `https://api.kamaee.pk/api/delete/subcategory/${deleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTableRows((prevRows) => prevRows.filter((row) => row.id !== deleteId));
      setIsDeleteModalOpen(false); 
      setDeleteId(null); 
      document.body.style.overflow = "auto"; 
    } catch (error) {
      console.error(
        "Error deleting subcategory:",
        error.response ? error.response.data : error.message
      );
      setError("Error deleting subcategory");
    }
  };

  const closeAlertModal = () => {
    setIsAlertOpen(false);
    document.body.style.overflow = "auto"; 
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; 
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
        <DataTable
          rows={tableRows}
          onEdit={handleEdit}
          onDelete={(id, name) => handleDeleteClick(id, name)} 
        />
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
          categories={categories} 
          onSubmit={(updatedData) => {
            setTableRows((prevRows) =>
              prevRows.map((row) =>
                row.id === updatedData.id
                  ? {
                      ...row,
                      subcategory_title: updatedData.subcategory_title,
                      category: updatedData.category_name,
                    }
                  : row
              )
            );
            closeEditModal();
          
          }}
          onClose={closeEditModal}
        />
      )}

      {isAlertOpen && (
        <AlertModal
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          subCategoryTitle={subCategoryTitle}
          setSubCategoryTitle={setSubCategoryTitle}
          onSubmit={() => {
            setTableRows((prevRows) => [
              ...prevRows,
              {
                id: Math.random(),
                subcategory_title: subCategoryTitle,
                category: categories.find(
                  (cat) => cat.id === parseInt(selectedCategory)
                ).category_name,
              },
            ]);
            closeAlertModal();
            handleApi()
          }}
          onClose={closeAlertModal}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          itemName={deleteName} 
          onDeleteConfirm={handleDeleteConfirm}
          onClose={() => {
            setIsDeleteModalOpen(false); 
            document.body.style.overflow = "auto"; 
          }}
        />
      )}
    </div>
  );
};

export default SubCategory;
