import React from 'react'
import Text, { DESCRIPTION_METHOD_SECTION } from '../Text'
import './styles.scss'

interface Props {
  note: string
}

const ImportantNote: React.FC<Props> = ({note}) => {
  return (
    <div className='ImportantNote'>
      <Text type={DESCRIPTION_METHOD_SECTION}>{note}</Text>
    </div>
  )
}

export default ImportantNote
