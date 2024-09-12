import '@/styles/mui/switch.scss'
import { styled } from '@mui/material/styles'
import Switch, { SwitchProps } from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
const SWITCH_INACTIVE_BG_COLOR = '#A2A2A2'
const SWITCH_ACTIVE_BG_COLOR = '#E8FAFF'
const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? SWITCH_INACTIVE_BG_COLOR : SWITCH_ACTIVE_BG_COLOR,
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}))

const MuiSwitch = ({label, name, value, onChangeForm}: {label: string, name: string, value: boolean, onChangeForm: any}) => {

    return (
        <FormControlLabel
            control={<IOSSwitch
                sx={{ m: 1 }}
                value={value}
                checked={value}
                onChange={(e) => { onChangeForm(e, name) }}
            />}
            label={label}
            className='mui-customize'
        />
    )
}

export default MuiSwitch