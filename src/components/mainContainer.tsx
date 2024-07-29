function MainContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full flex justify-center'>
      <div className='w-full max-w-[1280px]'>
        {children}
      </div>
    </div>
  )
}

export default MainContainer