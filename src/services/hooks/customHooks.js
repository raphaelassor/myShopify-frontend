import { useEffect, useState, useRef, useLayoutEffect } from 'react'

export const useForm = (initialState, cb = () => { }) => {
  const [fields, setFields] = useState(initialState)
  const [isFormEmpty, setFormEmptyStatus] = useState(true)
  useEffect(() => {
    cb(fields)
  }, [fields])

  useLayoutEffect(() => {
    updateEmptyStatus()
  }, [fields])

  const updateEmptyStatus = () => {
    const fieldsVals = Object.values(fields)
    const isEmpty = !fieldsVals.some(value => !!value)
    setFormEmptyStatus(isEmpty)
  }

  return [
    fields,
    function (ev) {
      const field = ev.target.name
      const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
      setFields(prevFields => ({ ...prevFields, [field]: value }))
    },
    setFields,
    isFormEmpty
  ]
}