import React from 'react';
import { Box, Container, Heading, Input, VStack, Button } from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode'
import { useProductStore } from '../store/product';

const CreatePage = () => {
  
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    image: "",
  });


  const {createProduct}=useProductStore();
  const handleAddProduct = async () => {
    const {success,message}=await createProduct(newProduct);
    if(!success){
      alert(message);
      return;
    }
    alert("Product created successfully!");
    setNewProduct({
      name: "",
      price: "",
      image: "",
      
    });
   
    // Add your product creation logic here
  };


  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign={"center"} mb="8">
          Create Product
        </Heading>
        <Box w="full" bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder="Product Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              placeholder="Product Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <Button onClick={handleAddProduct} colorScheme="blue">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;







