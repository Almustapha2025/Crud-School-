"use client"
import { Input } from './ui/input'
import { Button } from './ui/button'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'
import { FormEvent, use, useEffect, useState } from 'react'
import { supabase } from '@/app/lib/supabase'



interface Account{
    id?: string,
    firstname: string,
    surname: string,
    phone: string,
    email: string
}


export default function CreateAccount() {
    const [account, setAccount] = useState([])
    const [form, setForm] = useState<Account>({
        firstname: "",
        surname: "",
        phone: "",
        email: ""
    })

    async function FormHandleController(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(form)

        const { error } = await supabase.from('accounts').insert([form])
        if(!form.firstname || !form.surname || !form.email || !form.phone ){
            toast.error("Please All Field Are Required")
        }else{

        if(error){
            toast.error(error.message)
            toast.error(`Fails to submit Record ${error.message}`)
        }else{
            toast.success("Account Created Successfully")
            setForm({
                firstname: "",
                surname: "",
                phone:"",
                email: ""
            })
        }
        
    }
        
    }

    async function  fetchRecord() {
        const { data, error } = await supabase.from('accounts').select("*")
        if(error){
            toast.error(`Record Is Invalid ${error.message}`)
        }else{
            console.log(data)
        }
    }

    useEffect(() => {
        fetchRecord()
    }, [])

  return (
    <div className='flex justify-center items-center mt-20 mx-auto max-w-md bg-white rounded-lg shadow-md'>
        <Toaster />
        <div className='p-4'>
            <h2 className='py-2 text-center font-bold font-serif text-3xl text-blue-900'>Next Account</h2>
            <form onSubmit={FormHandleController}>
                <div className='w-full my-3'>
                    <label htmlFor='firstname' className='w-full text-md font-bold'>First Name</label>
                    <Input type='text' name='firstname' 
                                    value={form.firstname} 
                                    onChange={(e) => setForm({...form, firstname: e.target.value})} />
                </div>
                <div className='w-full my-3'>
                    <label htmlFor='surname' className='w-full text-md font-bold'>Surname</label>
                    <Input type='text' name='surname' 
                                    value={form.surname} 
                                    onChange={(e) => setForm({...form, surname: e.target.value})} />
                </div>
                <div className='w-full my-3'>
                    <label htmlFor='phone' className='w-full text-md font-bold'>Phone Number</label>
                    <Input type='text' name='phone' 
                                    value={form.phone} 
                                    onChange={(e) => setForm({...form, phone: e.target.value})} />
                </div>
                <div className='w-full my-3'>
                    <label htmlFor='email' className='w-full text-md font-bold'>Email Address</label>
                    <Input type='email' name='email' 
                                    value={form.email} 
                                    onChange={(e) => setForm({...form, email: e.target.value})} />
                </div>
                {/* <div className='w-full my-3'>
                    <label htmlFor='gender' className='w-full text-md font-bold'>Gender</label><br/>
                    <select name='gender' className='w-auto py-2 px-3'
                                value={form.gender} 
                                onChange={(e) => ({...form, gender: e.target.value})}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div> */}
                 <div className='w-full my-3'>
                    <Button type='submit' className="w-full bg-blue-900 font-bold font-serif py-4">Submit Account</Button>
                </div>
            </form>
        </div>
    </div>
  )
}
