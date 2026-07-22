"use client"
import { supabase } from '@/app/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { FormEvent, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

interface Contact{
  id?: string,
  fullname: string,
  email: string,
  title: string
}

  
export default function Contact() {
const [contact, setContact] = useState<Contact[]>([])
    const [editId, setEditId] = useState<string | null>(null)
    const [form, setForm] = useState<Contact>({
      fullname: "",
      email: "",
      title: ''
    });
    


    async function HandleSubmit(event: FormEvent<HTMLFormElement>){
      event.preventDefault()

      if(editId){
        const {error} = await supabase.from("contact").update(form).eq('id', editId)
        if(error){
          toast.error(`update error message ${error.message}`)
        }else{
          toast.success(`Successfully update contact`)
          setForm({
            fullname:"",
            email: "",
            title:""
          })
          Fetchcontact()
        }
      }else{
        const { error } = await supabase.from('contact').insert([ form ])

        if(error){
          toast.error(`Contact Not Submitted ${error.message}`)
        }else{
          toast.success( `Thanks for submiting contact`)
          setForm({
            fullname: '',
            email: "",
            title: ''
          })
        }

      }
      
      
    }

      
   
    async function Fetchcontact(){

      const { error, data } = await supabase.from("contact").select("*");

      if(error){
        toast.error(`Sorry Database Fetching record ${error.message}`)
      }else{
        setContact(data || [])
      }
    }
    useEffect(() => {
        Fetchcontact()
    }, [])
    
    
  function HandleEditFrom(contact: Contact): void {
    setForm(contact)
    setEditId(contact.id ?? null)
  }

  return (
    <>
      <div className='container mx-auto m-4 p-4 gap-4'>
        <Toaster/>
        <div className="flex justify-between gap-4 md:flex-row flex-col">
            <div className='w-[50%] rounded-lg p-4 mt-4 shadow-md'>
              <form onSubmit={HandleSubmit} className="w-full">
                                <div className="my-4 w-full">
                                    <Input type="text" name="fullname" value={form.fullname}
                                        onChange={(event) => setForm({ ...form, fullname: event.target.value })}
                                        className="w-full py-2 px-4 font-bold border border-gray-100" placeholder="Full Name" />
                                </div>
                               
                                <div className="my-4 w-full">
                                    <Input type="email" name="email" value={form.email}
                                        onChange={(event) => setForm({ ...form, email: event.target.value })}
                                        className="w-full py-2 px-4 font-bold border border-gray-100 " placeholder="Email Address" />
                                </div>

                                 <div className="my-4 w-full">
                                    <Input type="text" name="title" value={form.title}
                                        onChange={(event) => setForm({ ...form, title: event.target.value })}
                                        className="w-full py-2 px-4 font-bold border border-gray-100" placeholder="Title" />
                                </div>

                                <div className=" w-full">
                                    <Button type="submit" className="float-end rounded-lg font-bold bg-gray-600 p-4 text-white">
                                        {editId ? "Update Contact" : "Add Contact"}
                                    </Button>
                                </div>
                            </form>
            </div>

            <div className='w-full p-2'>
              <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase">
                        Full Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase">
                        Title Record
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {contact.map((contact: Contact) => (
                      <tr key={contact.id || contact.email} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-2 text-sm font-medium text-gray-800">
                        {contact.fullname}
                      </td>
                      <td className="px-6 py-2 text-sm text-gray-600">
                        {contact.fullname}
                      </td>
                      <td className="px-6 py-2 text-sm text-gray-600">
                        {contact.title}
                      </td>
                      <td className="px-6 py-2 text-sm text-gray-600">
                        <Button onClick={() => HandleEditFrom(contact)} className="border bg-blue-600  text-white text-sm">
                          Edit
                        </Button>
                        <Button className="border bg-red-600 text-white text-sm">Delete</Button>
                      </td>
                    </tr>
                    ))}
                    
                  </tbody>
                </table>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}
