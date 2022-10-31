import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import qs from 'qs'
import { isEmpty, isEqual, omit, pick, pickBy } from 'lodash';

export const useUrlState = (initialState: Record<string, any>) => {
    const [state, setState] = useState(initialState)
    const location = useLocation()
    const navigate = useNavigate()
    const relevantKeysForState = Object.keys(initialState)

    useEffect(() => {
        const parsedParams = qs.parse(location.search, { ignoreQueryPrefix: true })
        const relevantStateFromParams = pick(parsedParams, relevantKeysForState)
        if (!isEqual(relevantStateFromParams, state)) {
            setState(relevantStateFromParams)
        }
    }, [location.search])

    const updateStateToUrl = (state: Record<string, any>) => {
        const parsedParams = qs.parse(location.search, { ignoreQueryPrefix: true })
        const relevantParamsForCurrentState = omit(parsedParams, relevantKeysForState)
        const updatedStateWithValuesOnly = pickBy({ ...relevantParamsForCurrentState, ...state }, val => !isEmpty(val)
        )
        const updatedSearch = qs.stringify(updatedStateWithValuesOnly, { addQueryPrefix: true })
        navigate(`./${updatedSearch}`,)
    }

    return [state, updateStateToUrl] as const
}