import { create } from "zustand"

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "Please fill all fields" };
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        })
        const data = await res.json();
        set((state) => ({
            products: [...state.products, data.data],
        }))
        return { success: true, message: "Product created successfully" };
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        console.log("Fetched Products:", data.products); // Check if products exist
        set({ products: data.products });
    },
    updateProduct: async (pid, updatedProduct) => {
        if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
            return { success: false, message: "All fields are required" };
        }
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
            products: state.products.map((product) =>
                product._id === pid ? { ...product, ...updatedProduct } : product
            ),
        }));
        return { success: true, message: "Product updated successfully" };
    },
    
    
    
    deleteProduct:async(pid)=>{
        const res=await fetch(`/api/products/${pid}`,{
            method:"DELETE",
        })
        const data=await res.json();
        if(!data.success) return {success:false ,message:data.message}

        set(state=>({products:state.products.filter(product=>product._id !==pid)}));
        return {success:true, message:data.message};

    }

}))


