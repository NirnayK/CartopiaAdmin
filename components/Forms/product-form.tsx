"use client";

import * as z from "zod";
import axios from "axios";
import { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ProductProperties } from "@/models/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadButton, CldImage } from "next-cloudinary";
import {
  CategoryDocument,
  CategoryValue,
} from "@/components/Forms/category-form";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  properties: ProductProperties;
  images: string[];
}

interface ProductFormProps {
  proddata?: Product;
  categories: CategoryDocument[];
  method: string;
}

const FormSchema = z.object({
  name: z.string().nonempty(),
  price: z.number().positive(),
  description: z.string().nonempty(),
  category: z.string().nonempty(),
});

const ProductForm: React.FC<ProductFormProps> = ({
  proddata,
  categories,
  method,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: proddata?.name || "",
      price: proddata?.price || 0,
      description: proddata?.description || "",
      category: proddata?.category || "",
    },
  });

  const router = useRouter();

  const [currentImages, setCurrentImages] = useState<string[]>(
    proddata?.images || []
  );
  const [newImages, setNewImages] = useState<string[]>([]);
  const [deletedImages, setDELETEdImages] = useState<string[]>([]);

  // array of values of the selected category
  const [categoryValues, setCategoryValues] = useState<CategoryValue[]>([]);
  // properties of the product to submit
  const [properties, setProperties] = useState<ProductProperties>(
    proddata?.properties || {}
  );

  console.log("proddata", proddata);

  const handleCategoryChange = (categoryId: string) => {
    console.log("categoryId", categoryId);
    if (categoryId === "") {
      setCategoryValues([]);
      setProperties({});
      return;
    }
    // Find the selected category
    const SelectedCategoryData = categories.find(
      (category) => category._id === categoryId
    );

    SelectedCategoryData
      ? setCategoryValues(SelectedCategoryData.values)
      : null;

    if (proddata?.category === categoryId) {
      setProperties(proddata?.properties || {});
      return;
    }

    // Create properties object with empty values

    const updatedProperties: ProductProperties = {};
    SelectedCategoryData?.values.forEach((property) => {
      updatedProperties[property.name] = "";
    });

    setProperties(updatedProperties);
  };

  useEffect(() => {
    const handleCategoryChange = (categoryId: string) => {
      console.log("here");
      console.log("categoryId", categoryId);
      if (categoryId === "") {
        setCategoryValues([]);
        setProperties({});
        return;
      }
      // Find the selected category
      const SelectedCategoryData = categories.find(
        (category) => category._id === categoryId
      );

      SelectedCategoryData
        ? setCategoryValues(SelectedCategoryData.values)
        : null;

      if (proddata?.category === categoryId) {
        console.log("proddata?.properties", proddata?.properties);
        setProperties(proddata?.properties || {});
        return;
      }

      // Create properties object with empty values

      const updatedProperties: ProductProperties = {};
      SelectedCategoryData?.values.forEach((property) => {
        updatedProperties[property.name] = "";
      });

      setProperties(updatedProperties);
    };
    handleCategoryChange(proddata?.category || "");
  }, [proddata?.category, categories, proddata?.properties]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const product = {
      ...data,
      categoryid: data.category,
      properties,
      images: [...currentImages, ...newImages],
    };

    console.log("Hello we have reached on submit", product);

    try {
      switch (method) {
        case "POST":
          await axios.post("/api/products", product);
          break;
        case "EDIT":
          console.log("called edit");
          await axios.put(`/api/products/${proddata?._id}`, product);
          break;
        case "DELETE":
          await axios.delete(`/api/products/${proddata?._id}`);
          break;
        default:
          break;
      }
      router.push("/products");
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  const uploadPhotos = (e: any) => {
    console.log("e", e);
    setNewImages((prev) => [...prev, e.info.public_id]);
    console.log("newImages", newImages);
  };

  const removePhoto = (e: string) => {
    setDELETEdImages((prev) => [...prev, e]);
    setNewImages((prev) => prev.filter((img) => img !== e));
    setCurrentImages((prev) => prev.filter((img) => img !== e));
    console.log("2", newImages);
  };

  const handleBack = async () => {
    console.log("newImages", newImages);
    setDELETEdImages((prev) => [...prev, ...newImages]);
    const filteredImages = deletedImages.filter(
      (image) => !currentImages.includes(image)
    );

    console.log("filteredImages", filteredImages);
    try {
      if (filteredImages.length > 0) {
        await axios.post("/api/images", deletedImages);
      }
      router.push("/products");
    } catch (error) {
      console.error("Error deleting images:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto p-2"
      >
        {/* name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-bold text-xl">Product Name</FormLabel>
              <FormControl>
                <Input
                  readOnly={method === "DELETE"}
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                This is the product name which will be displayed.
              </FormDescription>
            </FormItem>
          )}
        />

        {/* price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-bold text-xl">Price</FormLabel>
              <FormControl>
                <Input
                  readOnly={method === "DELETE"}
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                This is the product price which will be displayed.
              </FormDescription>
              <FormMessage>{form.formState.errors.price?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-bold text-xl">Description</FormLabel>
              <FormControl>
                <Textarea
                  readOnly={method === "DELETE"}
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                This is the product description which will be displayed.
              </FormDescription>
            </FormItem>
          )}
        />

        {/* upload photos */}
        <div className="space-y-2">
          {/* <Button size="sm" disabled={method === "DELETE"}> */}
          <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3">
            <CldUploadButton
              uploadPreset="qhcyym20"
              onUpload={(e: any) => uploadPhotos(e)}
            >
              Upload Photos
            </CldUploadButton>
          </div>

          {/* </Button> */}
          <FormDescription>
            These are the product photos which will be displayed.
          </FormDescription>
        </div>

        {/* Images Display */}
        {(currentImages.length > 0 || newImages.length > 0) && (
          <div className="flex flex-wrap gap-5 p-2">
            {/* Current Images */}
            {currentImages.length > 0 &&
              currentImages.map((image) => (
                <div
                  key={image}
                  className="relative w-[200px] h-[200px] rounded-md overflow-hidden p-1"
                >
                  {method !== "DELETE" && (
                    <div className="z-10 absolute top-2 w-6 h-6 right-3">
                      <Trash
                        className="p-1 cursor-pointer"
                        size="30"
                        fill="red"
                        onClick={() => removePhoto(image)}
                      />
                    </div>
                  )}
                  <CldImage
                    src={image}
                    alt={image}
                    width={800}
                    height={800}
                    crop="fill"
                    gravity="auto"
                    sizes="(max-width:500px)50vw, (min-width:500px)33vw"
                    className="rounded-lg"
                  />
                </div>
              ))}

            {/* New Images */}
            {newImages.length > 0 &&
              newImages.map((image) => (
                <div
                  key={image}
                  className="relative w-[200px] h-[200px] rounded-md overflow-hidden p-1"
                >
                  {method !== "DELETE" && (
                    <div className="z-10 absolute top-2 w-6 h-6 right-3">
                      <Trash
                        className="p-1 cursor-pointer"
                        size="30"
                        fill="red"
                        onClick={() => removePhoto(image)}
                      />
                    </div>
                  )}
                  <CldImage
                    src={image}
                    alt={image}
                    width={800}
                    height={800}
                    crop="fill"
                    gravity="auto"
                    sizes="(max-width:500px)50vw, (min-width:500px)33vw"
                    className="rounded-lg"
                  />
                </div>
              ))}
          </div>
        )}

        {/* parent category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-bold text-xl">Category</FormLabel>
              <Select
                value={field.value || undefined}
                onValueChange={(value) => {
                  field.onChange(value);
                  handleCategoryChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger className="w-1/4 p-2">
                    <SelectValue placeholder="Select Category"></SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* properties */}

        <div className="flex flex-wrap gap-5">
          {categoryValues && (
              <FormLabel className="text-bold block text-xl">
                Properties
              </FormLabel>
            ) &&
            categoryValues.map((property, propertyIndex) => (
              <div className="flex flex-col gap-2" key={propertyIndex}>
                <Label>{property.name}</Label>
                <Select
                  required
                  value={properties[property.name]?.toString() || undefined}
                  onValueChange={(value) => {
                    setProperties((prev) => ({
                      ...prev,
                      [property.name]: value,
                    }));
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Value" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {property.values.map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
        </div>

        <div className="flex items-center justify-end space-x-8">
          {/* Cancel */}
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => handleBack()}
          >
            Cancel
          </Button>
          {/* SUBMIT */}
          <Button size="sm" type="submit">
            {method === "POST"
              ? "Create"
              : method === "EDIT"
              ? "Update"
              : "DELETE"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
