"use client"
import { supabase } from "@/app/lib/supabase"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Student{
    id?: string,
    fullname: string,
    phone: string,
    email: string
}

export default function page(){
    const [students, setStudents] = useState<Student[]>([]);
    const [form, setForm] = useState<Student>({
        fullname: "",
        phone: "",
        email: ""
    });

    const [editid, setEditId] = useState<string | null>(null);

    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log(form)

    const { error } = await supabase.from<Student>("students").insert([ form ])

       if(error){
        console.error(error)
        toast.error("Error adding student")
       } else {
        toast.success("Student added successfully")
       }
        
    }

  return (
    <>
        <div className="mt-8 p-2">
            <Toaster />
            <div className="container mx-auto p-4 rounded-lg">
                <div className="flex justify-between items-text-center w-full rounded-lg">
                    <div className="m-4 w-[70%] rounded-lg p-4 border border-gray-100 shadow-md">
                        <form onSubmit={ handleFormSubmit } className="w-full">
                            <div className="my-4 w-full">
                                <Input type="name" name="fullname" value={form.fullname}
                                 onChange={(event) => setForm({...form, fullname: event.target.value})} 
                                className="w-full py-2 px-4 border border-gray-100" placeholder="Full Name" />
                            </div>
                            <div className="my-4 w-full">
                                <Input type="name" name="phone" value={form.phone}
                                 onChange={(event) => setForm({...form, phone: event.target.value})} 
                                className="w-full py-2 px-4 border border-gray-100" placeholder="Phone Number" />
                            </div>
                            <div className="my-4 w-full">
                                <Input type="email" name="email" value={form.email}
                                 onChange={(event) => setForm({...form, email: event.target.value})} 
                                className="w-full py-2 px-4 border border-gray-100 " placeholder="Email Address" />
                            </div>
                            
                            <div className="my-4 w-full">
                                <Button type="submit" className="float-end rounded-lg font-bold bg-gray-700 text-white">Add Student</Button>
                            </div>
                        </form>
                    </div>
                    <div className="p-2 bg-white w-full">
                        <form>
                        
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
