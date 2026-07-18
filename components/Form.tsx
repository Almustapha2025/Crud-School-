"use client"
import { supabase } from "@/app/lib/supabase"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, FormEvent, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

interface Student {
    id?: string,
    fullname: string,
    phone: string,
    email: string
}

export default function page() {
    const [students, setStudents] = useState<Student[]>([]);
    const [form, setForm] = useState<Student>({
        fullname: "",
        phone: "",
        email: ""
    });
    // editId is used to track the student being edited. If it's null, we're adding a new student; if it has a value, we're editing an existing student.
    const [editId, setEditId] = useState<string | null>(null);

    // Fetch all students from the database and update the state
    async function fetchStudents() {
        const { data, error } = await supabase.from('students').select("*")
        if (error) {
            toast.error("Student Record Not Found !")
        } else {
            setStudents(data || [])
        }
    }

    useEffect(() => {
        fetchStudents()
    }, [])

    // Handle form submission for adding or updating a student
    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if(editId){
            // Updating Student Record
                const { error } = await supabase
                    .from("students")
                    .update(form)
                    .eq("id", editId);
                if (error) {
                    console.error(error.message)
                    toast.error("Error updating student")
                }else{
                    toast.success("Student updated successfully")
                    setForm({
                        fullname: "",
                        phone: "",
                        email: ""
                    })
                    setEditId(null)
                    fetchStudents()
                }
            }else{
            // Add Student Record
                
                if (!form.fullname || !form.phone || !form.email) {
                    toast.error("Please fill in all fields");
                    return;
                }
                const { error } = await supabase
                    .from("students")
                    .insert([form]);
                if (error) {
                    console.error(error.message)
                    toast.error("Error adding student")
                } else {
                    console.log(form)
                    toast.success("Student added successfully")
                    setForm({
                        fullname: "",
                        phone: "",
                        email: ""
                    })
                    fetchStudents()
                }

            }




    }

    // Handle form submission for updating a student
    async function handleFormEdit(student: Student) {
        setForm(student)
        if(student.id){
            setEditId(student.id)
        } else {
            setEditId(null) 
        }
        
    }
    async function handleFormDelete(studentId: string) {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Did you rely wan't to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })

        if (result.isConfirmed) {
            const { error } = await supabase.from("students").delete().eq("id", studentId)
            if (!error) {
                toast.success("Student deleted successfully")
                fetchStudents()
            } else {
                console.error(error.message)
                toast.error("Error deleting student")
            }
        }

        
        
    }

    return (
        <>
            <div className="mt-8 p-2">
                <Toaster />
                <div className="container mx-auto p-4 rounded-lg">
                    <div className="flex justify-between items-text-center w-full rounded-lg md:flex-row flex-col">
                        <div className="m-4 w-[50%] h-[70%] rounded-lg px-4 py-2 border border-gray-50 bg-white shadow-md">
                            <h3 className="text-lg font-bold mb-4">Add Student</h3>
                            <form onSubmit={handleFormSubmit} className="w-full">
                                <div className="my-4 w-full">
                                    <Input type="text" name="fullname" value={form.fullname}
                                        onChange={(event) => setForm({ ...form, fullname: event.target.value })}
                                        className="w-full py-2 px-4 font-bold border border-gray-100" placeholder="Full Name" />
                                </div>
                                <div className="my-4 w-full">
                                    <Input type="text" name="phone" value={form.phone}
                                        onChange={(event) => setForm({ ...form, phone: event.target.value })}
                                        className="w-full py-2 px-4 font-bold border border-gray-100" placeholder="Phone Number" />
                                </div>
                                <div className="my-4 w-full">
                                    <Input type="email" name="email" value={form.email}
                                        onChange={(event) => setForm({ ...form, email: event.target.value })}
                                        className="w-full py-2 px-4 font-bold border border-gray-100 " placeholder="Email Address" />
                                </div>

                                <div className="my-4 w-full">
                                    <Button type="submit" className="float-end rounded-lg font-bold bg-gray-700 text-white">
                                        {editId ? 'Update Student' : 'Add Student'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                        <div className="p-2 w-full">
                            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Full Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Phone
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {students.map((student: Student) => (
                                            <tr key={student.id ?? student.email} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-2 text-sm text-gray-800">
                                                    {student.fullname}
                                                </td>
                                                <td className="px-6 py-2 text-sm text-gray-800">
                                                    {student.phone}
                                                </td>
                                                <td className="px-6 py-2 text-sm text-gray-800">
                                                    {student.email}
                                                </td>
                                                <td className="px-6 py-2 text-sm text-gray-800">
                                                    <Button className="bg-red-500 text-white hover:bg-red-600 mx-2"
                                                        onClick={() => student.id && handleFormDelete(student.id)}>Delete</Button>
                                                    <Button onClick={() => handleFormEdit(student)} className="bg-blue-500 text-white hover:bg-blue-600 mx-2">Edit</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
