import React from 'react';
import { FiUpload } from 'react-icons/fi';
import { 
  ContentHeader, 
  HelpLink, 
  FormContainer, 
  StyledForm, 
  FormRow, 
  FormGroup, 
  Label, 
  Input, 
  Select, 
  Textarea, 
  FileUpload, 
  FileInput as StyledFileInput, 
  UploadLabel, 
  UploadIcon, 
  FileHint, 
  PreviewContainer, 
  VideoPreview, 
  FormActions, 
  SubmitButton, 
  CancelButton, 
  Spinner,
  CheckboxContainer,
  CheckboxInput,
  CheckboxLabel
} from '../shared/StyledComponents';

const VideoForm = ({
  formData,
  setFormData,
  videoFile,
  setVideoFile,
  avatarFile,
  setAvatarFile,
  previewUrl,
  editingId,
  isSubmitting,
  categories,
  resetForm,
  handleSubmit,
  handleUpdate
}) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleFileChange = (e, setFile) => {
    if (!e.target.files || !e.target.files[0]) return;
    setFile(e.target.files[0]);
  };

  return (
    <>
      <ContentHeader>
        <h1>{editingId ? 'Edit Video' : 'Upload New Video'}</h1>
        <HelpLink>Help & resources</HelpLink>
      </ContentHeader>
      
      <FormContainer>
        <StyledForm onSubmit={editingId ? (e) => { e.preventDefault(); handleUpdate(); } : handleSubmit}>
          <FormRow>
            <FormGroup>
              <Label>Video Title *</Label>
              <Input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <CheckboxContainer>
                <CheckboxInput
                  type="checkbox"
                  name="is_short"
                  id="is_short"
                  checked={formData.is_short || false}
                  onChange={handleChange}
                />
                <CheckboxLabel htmlFor="is_short">
                  This is a Short
                </CheckboxLabel>
              </CheckboxContainer>
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <Label>Channel *</Label>
              <Input 
                type="text" 
                name="channel" 
                value={formData.channel} 
                onChange={handleChange} 
                required 
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Category *</Label>
              <Select 
                name="category_id" 
                value={formData.category_id} 
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </FormRow>
          
          <FormGroup>
            <Label>Description</Label>
            <Textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows="4" 
            />
          </FormGroup>
          
          {!editingId && (
            <>
              <FormRow>
                <FormGroup>
                  <Label>Video File *</Label>
                  <FileUpload>
                    <StyledFileInput 
                      type="file" 
                      accept="video/mp4,video/webm" 
                      onChange={(e) => handleFileChange(e, setVideoFile)}
                      required
                    />
                    <UploadLabel>
                      {videoFile ? videoFile.name : 'Choose video file...'}
                    </UploadLabel>
                    <UploadIcon>
                      <FiUpload size={18} />
                    </UploadIcon>
                  </FileUpload>
                  <FileHint>MP4 or WebM, max 10GB</FileHint>
                </FormGroup>
                
                <FormGroup>
                  <Label>Thumbnail</Label>
                  <FileUpload>
                    <StyledFileInput 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileChange(e, setAvatarFile)}
                    />
                    <UploadLabel>
                      {avatarFile ? avatarFile.name : 'Choose thumbnail...'}
                    </UploadLabel>
                    <UploadIcon>
                      <FiUpload size={18} />
                    </UploadIcon>
                  </FileUpload>
                  <FileHint>JPG, PNG or GIF</FileHint>
                </FormGroup>
              </FormRow>
              
              {previewUrl && (
                <PreviewContainer>
                  <Label>Video Preview</Label>
                  <VideoPreview controls>
                    <source src={previewUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </VideoPreview>
                </PreviewContainer>
              )}
            </>
          )}
          
          <FormActions>
            {editingId && (
              <CancelButton type="button" onClick={resetForm}>
                Cancel
              </CancelButton>
            )}
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Spinner />
              ) : editingId ? (
                'Update Video'
              ) : (
                'Upload Video'
              )}
            </SubmitButton>
          </FormActions>
        </StyledForm>
      </FormContainer>
    </>
  );
};

export default VideoForm;