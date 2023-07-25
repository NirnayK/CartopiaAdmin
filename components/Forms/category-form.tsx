"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { Minus, Plus } from "lucide-react";

const FormSchema = z.object({
  name: z.string().nonempty(),
});

const initialData: CategoryValue[] = [
  {
    name: "Brand",
    values: [""],
  },
];

export interface CategoryValue {
  name: string;
  values: string[];
}

export interface CategoryDocument {
  _id: string;
  name: string;
  values: CategoryValue[];
}

interface CategoryFormProps {
  catdata?: CategoryDocument; // Make data optional
  method: string;
}
// is already recieving the id as string
const CategoryForm: React.FC<CategoryFormProps> = ({ catdata, method }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: catdata?.name || "",
    },
  });

  const router = useRouter();

  const [values, setValues] = useState<CategoryValue[]>(
    catdata?.values || initialData
  );

  const addNewProperty = (e: React.MouseEvent) => {
    e.preventDefault();
    setValues([...values, { name: "", values: [""] }]);
  };

  const removeProperty = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    const updatedValues = values.filter((_, i) => i !== index);
    setValues(updatedValues);
  };

  const addValue = (
    e: React.MouseEvent | React.KeyboardEvent,
    propertyIndex: number
  ) => {
    e.preventDefault();
    const updatedValues = [...values];
    updatedValues[propertyIndex].values.push("");
    setValues(updatedValues);
  };

  const removeValue = (
    e: React.MouseEvent,
    propertyIndex: number,
    valueIndex: number
  ) => {
    e.preventDefault();
    const updatedValues = [...values];
    if (updatedValues[propertyIndex].values.length === 1) {
      return; // Ensure at least one value field remains
    }
    updatedValues[propertyIndex].values.splice(valueIndex, 1);
    setValues(updatedValues);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    propertyIndex: number,
    valueIndex: number | null = null
  ) => {
    e.preventDefault();
    const updatedValues = [...values];
    if (valueIndex === null) {
      updatedValues[propertyIndex].name = e.target.value;
    } else {
      updatedValues[propertyIndex].values[valueIndex] = e.target.value;
    }
    setValues(updatedValues);
  };

  //delete is remaining
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // Extract all the values from the dynamic input fields
    const formData = {
      ...data,
      values: values,
    };
    try {
      switch (method) {
        case "POST":
          await axios.post("/api/categories", formData);
          break;
        case "EDIT":
          await axios.put(`/api/categories/${catdata?._id}`, formData);
          break;
        case "DELETE":
          await axios.delete(`/api/categories/${catdata?._id}`);
          break;
        default:
          break;
      }
      router.push("/categories");
    } catch (error) {
      console.error(error);
    }

    // Combine the extracted values with the rest of the form data

    console.log(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto p-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-bold text-xl">Category Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                />
              </FormControl>
              <FormDescription>This is the main category name.</FormDescription>
            </FormItem>
          )}
        />
        {/* Dynamic Properties */}
        {values.map((property, propertyIndex) => (
          <div className="space-y-4 p-2" key={propertyIndex}>
            <FormLabel className="text-bold flex items-center justify-between text-xl">
              Property {propertyIndex + 1}:
              <div className="flex gap-2">
                {/* REMOVE PROPERTY */}
                <Button
                  size="sm"
                  disabled={method == "Delete" || property.values.length < 2}
                  variant="destructive"
                  onClick={(e) => removeProperty(e, propertyIndex)}
                >
                  <Minus />
                  Property
                </Button>
                {/* NEW VALUE */}
                <Button
                  size="sm"
                  disabled={method === "Delete"}
                  variant="outline"
                  className="flex gap-1 items-center"
                  onClick={(e) => addValue(e, propertyIndex)}
                >
                  <Plus />
                  Value
                </Button>
              </div>
            </FormLabel>
            <FormControl>
              <Input
                value={property.name}
                required
                disabled={method == "Delete" || propertyIndex === 0}
                onChange={(e) => handleChange(e, propertyIndex)}
              />
            </FormControl>
            <p className="text-semibold text-xl">Values:</p>
            {property.values.map((value, valueIndex) => (
              <div className="flex flex-1 gap-3 items-center" key={valueIndex}>
                <FormLabel className="text-sm md:text-lg">
                  {valueIndex + 1}:
                </FormLabel>
                <FormControl>
                  <Input
                    value={value}
                    required
                    readOnly={method === "Delete"}
                    onChange={(e) => handleChange(e, propertyIndex, valueIndex)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addValue(e, propertyIndex);
                      }
                    }}
                  />
                </FormControl>
                {/* REMOVE VALUE */}
                <Button
                  size="icon"
                  disabled={method === "Delete" || property.values.length < 2}
                  variant="destructive"
                  className="flex gap-1 items-center"
                  onClick={(e) => removeValue(e, propertyIndex, valueIndex)}
                >
                  <Minus />
                </Button>
              </div>
            ))}
          </div>
        ))}
        <div className="flex items-center justify-start space-x-2 ">
          {/* NEW PROPERTY */}
          {method !== "Delete" && (
            <Button
              size="sm"
              className="flex gap-1 items-center"
              variant="ghost"
              onClick={addNewProperty}
            >
              <Plus />
              Property
            </Button>
          )}
        </div>
        {/* Submit and Cancel */}
        <div className="flex items-center justify-end space-x-8">
          {/* Cancel */}
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
          {/* SUBMIT */}
          <Button size="sm" type="submit">
            {method === "POST"
              ? "Create"
              : method === "EDIT"
              ? "Update"
              : "Delete"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
