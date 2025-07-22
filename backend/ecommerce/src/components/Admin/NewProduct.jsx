'use client'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, createProduct } from '@/actions/productAction'
import { NEW_PRODUCT_RESET } from '@/constants/productConstants'
import { useAlert } from 'react-alert'
import { useRouter } from 'next/navigation'
import {
  MdCategory,
  MdDescription,
  MdStorage,
  MdTitle,
  MdAttachMoney,
} from 'react-icons/md'
import Sidebar from './Sidebar'
import MetaData from '../layout/MetaData'

const categories = [
  'Laptop',
  'Footwear',
  'Bottom',
  'Tops',
  'Attire',
  'Camera',
  'SmartPhones',
]

const NewProduct = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const router = useRouter()

  const { loading, error, success } = useSelector((state) => state.newProduct)

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState(0)
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (success) {
      alert.success('Product Created Successfully')
      router.push('/admin/dashboard')
      dispatch({ type: NEW_PRODUCT_RESET })
    }
  }, [dispatch, alert, error, success, router])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set('name', name)
    formData.set('price', price)
    formData.set('description', description)
    formData.set('category', category)
    formData.set('Stock', stock)
    images.forEach((image) => formData.append('images', image))
    dispatch(createProduct(formData))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImages([])
    setImagesPreview([])

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((prev) => [...prev, reader.result])
          setImages((prev) => [...prev, reader.result])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <>
      <MetaData title="Create Product" />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-grow flex items-center justify-center bg-gray-100 p-4">
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-4"
          >
            <h2 className="text-2xl font-semibold text-center text-gray-700">Create Product</h2>

            <div className="relative flex items-center">
              <MdTitle className="absolute left-3 text-gray-500 text-xl" />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 p-2 border rounded"
              />
            </div>

            <div className="relative flex items-center">
              <MdAttachMoney className="absolute left-3 text-gray-500 text-xl" />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full pl-10 p-2 border rounded"
              />
            </div>

            <div className="relative flex items-start">
              <MdDescription className="absolute left-3 top-2 text-gray-500 text-xl" />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                className="w-full pl-10 p-2 border rounded"
              />
            </div>

            <div className="relative flex items-center">
              <MdCategory className="absolute left-3 text-gray-500 text-xl" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-10 p-2 border rounded text-gray-700"
              >
                <option value="">Choose Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative flex items-center">
              <MdStorage className="absolute left-3 text-gray-500 text-xl" />
              <input
                type="number"
                placeholder="Stock"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full pl-10 p-2 border rounded"
              />
            </div>

            <div>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border file:rounded file:bg-gray-50 file:text-gray-700 file:cursor-pointer"
              />
            </div>

            <div className="flex space-x-2 overflow-x-auto">
              {imagesPreview.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewProduct
