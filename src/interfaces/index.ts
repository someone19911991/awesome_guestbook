import React from 'react'

export interface IVisitor {
    fullName: string
    email: string
    department: '' | 'Marketing' | 'It' | 'Sales' | 'Management'
    agree?: boolean
}

export interface IAddVisitorProps {
    visitors: Array<IVisitor>
    setVisitors: (visitor: Array<IVisitor>) => void
}

export interface ITableColumn {
    title: string
    field: string
    align?: 'left' | 'center' | 'right'
    // render?: (rowData: string) => React.ReactNode;
    render?:  any
}

export interface IVisitorsTableProps {
    visitors: Array<IVisitor>
    setVisitors: (arg: Array<IVisitor>) => void
}
