import React from 'react'

const NotFound = () => {
  return (
    <section className='flex-1 w-full box-border mt-56'>
        <div className='flex items-center justify-center gap-10'>
            <div className='border-2 border-primary/80 rounded-l-full w-[15%]'>

            </div>
            <h1 className='text-8xl font-extrabold'>
                404
            </h1>
            <p className='text-xl'>
                Page is Not Found
            </p>
            <div className='border-2 border-primary/80 rounded-r-full w-[15%]'>

            </div>
        </div>
    </section>
  )
}

export default NotFound
