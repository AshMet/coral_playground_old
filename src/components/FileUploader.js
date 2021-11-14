import React, {useRef} from 'react'
import { Input, Button, Container } from '@chakra-ui/react'

const FileUploader = ({onFileSelect}) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        // handle validations
        onFileSelect(e.target.files[0])
    }

    return (
        
        <Container className="file-uploader">
            <Input type="file"
            accept="image/*"
            w="full"
            multiple={false}
            id="profilePhoto"
            onChange={handleFileInput} />
            <Button 
            className="btn btn-primary"
            onClick={e => fileInput.current && fileInput.current.click()}
             />
            {/* <input type="file" onChange={handleFileInput}>
            <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary"> */}
        </Container>
    )
}