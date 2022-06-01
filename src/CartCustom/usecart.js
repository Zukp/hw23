import { useState } from "react"

const useCart = (value) => {
 
  const [entred,setEntred] = useState('')
  const [isValid,setIsValid] = useState(false)
  const nameValue = value(entred)
 const isValidRes = nameValue && isValid
  const valueHandler = (e) => {
      setEntred(e.target.value)
  }
  const valueIsValid = () => {
    setIsValid(true)
  }  
  return {
      value:entred,
      valueHandler,
      isValidRes,
      valueIsValid,
  }
}
  
export default useCart