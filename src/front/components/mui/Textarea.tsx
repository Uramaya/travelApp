import '@/styles/mui/switch.scss'
import { styled } from '@mui/material/styles'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize'
const TEXTAREA_FONT_COLOR = '#676565'
const TEXTAREA_BG_COLOR = '#F6F5F5'
const TEXTAREA_PLACEHOLDER_BG_COLOR = '#B4B3B3'
const MuiTextarea = ({label, placeholder, formName, onChangeForm}: { label: string, placeholder: string, formName: string, onChangeForm: any }) => {
  
    const Textarea = styled(BaseTextareaAutosize)(
      ({ theme }) => `
      box-sizing: border-box;
      width: 100%;
      font-weight: 400;
      line-height: 1.5;
      padding: 12px;
      border-radius: 12px 12px 0 12px;
      color: ${TEXTAREA_FONT_COLOR};
      background: ${TEXTAREA_BG_COLOR};
      border: 0;
      box-shadow: none;
      // firefox
      &:focus-visible {
        outline: 0;
      }
      &::placeholder {
        color: ${TEXTAREA_PLACEHOLDER_BG_COLOR};
      }
    `,
    )
  
    return <Textarea aria-label={label} placeholder={placeholder} minRows={4} onChange={(e) => { onChangeForm(e, formName) }}/>
  }

export default MuiTextarea