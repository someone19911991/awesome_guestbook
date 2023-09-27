import React, { FC, useState } from 'react'
import MaterialTable from 'material-table'
import Box from '@mui/material/Box'
import { consts } from '../utils/consts'
import { Button, Card } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import { IVisitor, IVisitorsTableProps } from '../interfaces'
import {tableColumns} from '../utils/consts'

const VisitorsTable:FC<IVisitorsTableProps> = ({visitors, setVisitors}) => {
    const [deleteCheckboxChecked, setDeleteCheckboxChecked] = useState(false)
    const [selectedRows, setSelectedRows] = useState<Array<IVisitor>>([])

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDeleteCheckboxChecked(prev => !prev)
    }

    const handleOnSelectChange = (rows: Array<IVisitor>) => {
        setSelectedRows(rows)
    }

    const handleDelete = () => {
        const selectedRowsEmails = selectedRows.map(row => row.email)
        const visitorsToStay = visitors.filter(visitor => !selectedRowsEmails.includes(visitor.email))
        if(deleteCheckboxChecked){
            setVisitors(visitorsToStay)
            setDeleteCheckboxChecked(false)
            setSelectedRows([])
        }
    }

    return (
        <Card sx={{p: 2, pb: 0 }}>
            <Typography variant="h4" padding="16px 0" mb={2}>Visitor Management</Typography>
                <Box display="flex" alignItems="flex-start">
                    <Checkbox
                        checked={deleteCheckboxChecked}
                        onChange={handleCheckboxChange}
                        color="error"
                        disabled={!selectedRows.length}
                    />
                    <Button
                        sx={{mb: 2}}
                        variant="contained"
                        color="error"
                        size="medium"
                        onClick={handleDelete}
                        disabled={!selectedRows.length}
                    >
                        Remove
                    </Button>
                </Box>
                <MaterialTable
                    style={{boxShadow: 'none', color: 'error'}}
                    icons={consts}
                    columns={tableColumns}
                    data={visitors}
                    options={{
                        headerSelectionProps: {color: 'secondary'},
                        selectionProps: () => ({color: 'secondary'}),
                        toolbar: false,
                        showTitle: false,
                        paging: false,
                        search: false,
                        selection: true,
                        showTextRowsSelected: false,
                        toolbarButtonAlignment:"left"
                    }}
                    onSelectionChange={(selectedRows) => handleOnSelectChange(selectedRows)}
                />
        </Card>
    )
}

export default VisitorsTable
