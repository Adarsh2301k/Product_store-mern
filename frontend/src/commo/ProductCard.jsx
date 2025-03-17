import React, { useState } from "react";
import { Box, HStack, Image, Heading, Text, VStack } from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductStore } from "@/store/product";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();

  const [isEditing, setIsEditing] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  // Handles input changes
  const handleChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
  };

  // Handles edit save
  const handleSaveEdit = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    if (!success) {
      alert("Something went wrong");
    } else {
      alert("Product updated successfully");
      setIsEditing(false);
    }
  };

  // Handles product deletion
  const handleDeleteProduct = async () => {
    const { success, message } = await deleteProduct(product._id);
    if (!success) {
      alert("Something went wrong");
    } else {
      alert("Product deleted successfully");
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{
        transform: "translateY(-5px)",
        shadow: "xl",
      }}
      p={3}
      m={3}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} w={"full"} h={48} objectFit={"cover"} />

      <Box p={1}>
        {isEditing ? (
          // Edit Mode
          <VStack align="start">
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
              placeholder="Product Name"
              style={{ width: "100%", padding: "5px", border: "1px solid gray" }}
            />
            <input
              type="number"
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
              placeholder="Price"
              style={{ width: "100%", padding: "5px", border: "1px solid gray" }}
            />
            <input
              type="text"
              name="image"
              value={updatedProduct.image}
              onChange={handleChange}
              placeholder="Image URL"
              style={{ width: "100%", padding: "5px", border: "1px solid gray" }}
            />
            <HStack>
              <button onClick={handleSaveEdit} style={{ padding: "5px 10px", background: "green", color: "white", border: "none", cursor: "pointer" }}>Save</button>
              <button onClick={() => setIsEditing(false)} style={{ padding: "5px 10px", background: "red", color: "white", border: "none", cursor: "pointer" }}>Cancel</button>
            </HStack>
          </VStack>
        ) : (
          // View Mode
          <>
            <Heading as="h3" size="md" mb={2}>
              {product.name}
            </Heading>
            <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
              ${product.price}
            </Text>
            <HStack spacing={2}>
              <FaRegEdit size={20} onClick={() => setIsEditing(true)} style={{ cursor: "pointer" }} />
              <MdDeleteOutline size={20} onClick={handleDeleteProduct} style={{ cursor: "pointer" }} />
            </HStack>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductCard;
