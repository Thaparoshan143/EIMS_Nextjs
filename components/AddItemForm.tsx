import ItemForm, { IItemForm } from './ItemForm';

const AddItemForm = ({onFormSubmit, onFormClose}: IItemForm) => {

  return (
    <ItemForm
      onFormSubmit={onFormSubmit}
      onFormClose={onFormClose}
    />
  )
}

export default AddItemForm