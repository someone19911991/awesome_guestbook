import { IVisitor } from '../interfaces'
import { useEffect, useRef, useState } from 'react'

const useLSVisitors = (visitorsInState: Array<IVisitor>) => {
    const renderTimes = useRef(0)
    const [currentVisitors, setCurrentVisitors] = useState<Array<IVisitor>>([])

    useEffect(() => {
        const visitorsLS = localStorage.getItem('visitors')
        let visitors: Array<IVisitor> = []
        if(visitorsLS){
            visitors = JSON.parse(visitorsLS) as Array<IVisitor>
            setCurrentVisitors(visitors)
        }
    }, [])

    useEffect(() => {
        if(renderTimes.current){
           setCurrentVisitors(visitorsInState)
            localStorage.setItem('visitors', JSON.stringify(visitorsInState))
        }
        renderTimes.current += 1
    }, [visitorsInState])

    return currentVisitors
}

export default useLSVisitors