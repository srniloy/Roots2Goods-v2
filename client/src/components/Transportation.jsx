import React from 'react'




async function takeTimes(){
    await new Promise((resolve)=>{
        setTimeout(resolve, 3000)
    })
}

const Transportation = () => {
    // await takeTimes()
  return (
    <div>Transportation</div>
  )
}

export default Transportation