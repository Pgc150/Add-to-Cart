import React, { useState } from 'react'

const Product = () => {
    const products=[
        {id:1,name:'Laptop',price:500000},
        {id:2,name:'Mobile',price:500000},
        {id:3,name:'Tv',price:50000},
        {id:4,name:'Freeze',price:500000},
        {id:5,name:'Washing machine',price:500000},
        
    ]

    const[cart,setCart] = useState([]);

    const addToCart = (product) =>{
        const existing = cart.find((item)=>item.id === product.id)
        if(existing){
            setCart(
                cart.map((item)=>
                item.id === product.id ? {...item,qty:item.qty + 1 }:item)
            )
            
        }else{
            setCart([...cart,{...product,qty:1}])
        }
    }

    const decreaseQty=(id)=>{
         setCart(
            cart.map((item)=>
            item.id === id ? {...item,qty:item.qty - 1} : item).filter((item)=>item.qty>0)
         )
    }

    const increaseQty = (id) => {
        setCart(
            cart.map((item)=>
            item.id === id ? {...item,qty:item.qty + 1} : item)
         )
    }

    const removeItem = (id) => {
        setCart(cart.filter((item)=> item.id !== id ))
    }

    const total= cart.reduce(
        (sum,item) => sum + item.price * item.qty,0
    )

  return (
    <div className='min-screen bg-gray-50 p-6'>
        <div className='grid md:grid-cols-2 gap-8 max-w5xl mx-auto'>
            <div className='bg-white p-4 rounded-2xl shadow'>
                <h2 className='text-lg font-bold mb-3 text-gray-700'>Products</h2>
                <div className='space-y-3'>
                    {products.map((p)=>(
                    <div 
                    key={p.id}
                    className='flex justify-between items-center border-b pb-2'>
                        <div className='font-medium'>
                            <p className='font-medium'>{p.name}</p>
                            <p className='text-sm text-gray-500'>{p.price}</p>
                        </div>
                        <button 
                        onClick={()=>addToCart(p)}
                        className='bg-indigo-600 text-white px-3 py-1 rounded-xl '>Add to Cart</button>
                    </div>
                      ))}

                </div> 
            </div>
            <div className='bg-white p-4 rounded-2xl shadow'>
                <h2>Your Cart</h2>
                {cart.length === 0 ?(
                     <p>No Items in cart</p>
                ):(
                  <div className='space-p-4'>
                 {cart.map((item)=>(
                    <div
                       key={item.id}
                     className='flex justify-between items-center border-b pb-2'>
                        <div>
                            <p className='font-medium'>{item.name}</p>
                            <p className='text-sm text-gray-500'>
                                {item.price} x {item.qty} = {item.price * item.qty} 
                                </p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <button
                             onClick={()=>decreaseQty(item.id)}
                             className='px-2 py-1 bg-gray-200 rounded'>-</button>
                            <span>{item.qty}</span>
                            <button 
                            onClick={()=>increaseQty(item.id)}
                            className='px-2 py-1 bg-gray-200 rounded'>+</button>
                            <button 
                            onClick={()=>removeItem(item.id)}
                            className='text-red-600 text-sm'>remove</button>
                        </div>
                    </div>
                      ))}
                    <div className='text-right font-semibold text-lg text-indigo-700'>Total:{total}</div>
                </div>

                )}
   
            </div>
        </div>
    </div>
  )
}

export default Product