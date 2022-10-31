import { useEffect, useState, useRef, useLayoutEffect, ChangeEvent } from 'react'
import { useUrlState } from './useUrlState'

export const useForm: <T extends Record<string, any>>(initialState: T, cb?: (...args: any) => void) => [Record<string, any>, (ev: ChangeEvent<HTMLInputElement>) => void, (state: Record<keyof T, any>) => void, boolean] = (initialState, cb) => {
  const [fields, setFields] = useUrlState(initialState)
  const [isFormEmpty, setFormEmptyStatus] = useState(true)

  useEffect(() => {
    if (cb) {
      cb(fields)
    }
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
    function (ev: ChangeEvent<HTMLInputElement>) {
      const field = ev.target.name
      const value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
      setFields({ ...fields, [field]: value })
    },
    setFields,
    isFormEmpty
  ]
}