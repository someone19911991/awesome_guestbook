import React, { FC, useMemo } from 'react'
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel, FormHelperText,
    Grid,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { IAddVisitorProps, IVisitor } from '../interfaces'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {styled} from '@mui/material'

const departmentValues = ["Marketing", "It", "Sales", "Management"]

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    '@media (max-width: 990px)': {
        flexWrap: 'wrap',
        flexDirection: 'column'
    }
}));

const AddVisitorForm: FC<IAddVisitorProps> = ({ visitors, setVisitors }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        control,
        watch
    } = useForm<IVisitor>({
        defaultValues: {
            fullName: '',
            email: '',
            department: '',
            agree: false,
        },
    })

    const watchAgree = watch('agree')
    const visitorsEmails = useMemo(
        () => visitors.map((visitor) => visitor.email),
        [visitors]
    )

    const submit: SubmitHandler<IVisitor> = (data) => {
        setVisitors([...visitors, data])
        reset()
    }

    const isEmailUnique = (newEmail: string) => {
        return !visitorsEmails.includes(newEmail);
    };

    const handleReset = () => {
        reset()
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <Grid item xs={12}>
                <Typography sx={{marginBottom: 2, fontWeight: 600}} variant="subtitle2">Add a new visitor</Typography>
            </Grid>
            <Stack spacing={2}>
                <TextField
                    {...register('fullName', {
                        required: 'Full name is required',
                    })}
                    label={'Full name'}
                    placeholder="Enter your full name"
                    fullWidth
                    variant="outlined"
                    required
                    error={!!errors?.fullName}
                    helperText={errors?.fullName?.message}
                    sx={{ marginBottom: '10px' }}
                />
                <TextField
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                        validate: (value) =>
                            isEmailUnique(value) || 'Email already in use',
                    })}
                    type="email"
                    label={'Email address'}
                    placeholder="Enter your email"
                    fullWidth
                    variant="outlined"
                    required
                    error={!!errors?.email}
                    helperText={errors?.email?.message}
                    sx={{ marginBottom: '10px' }}
                />
                <Controller
                    name="department"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Department is required' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Department"
                            select
                            required
                            error={!!errors?.department}
                            helperText={errors?.department?.message}
                            sx={{ marginBottom: '10px' }}
                        >
                            {departmentValues.map((department) => (
                                <MenuItem key={department} value={department}>
                                    {department}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />
                <FormControlLabel
                    label="I agree to be added to the table"
                    control={<Checkbox checked={watchAgree} color="secondary" {...register('agree', {required: 'You should agree'})} />}
                />
                <FormHelperText sx={{marginTop: '0 !important'}} error={!!errors?.agree}>{errors?.agree?.message}</FormHelperText>
                <StyledBox>
                    <Button color="error" variant="outlined" onClick={handleReset}>Reset form</Button>
                    <Button sx={{flex: 1}} type="submit" color="secondary" variant="contained">
                        Add new visitor
                    </Button>
                </StyledBox>
            </Stack>
        </form>
    )
}

export default AddVisitorForm
