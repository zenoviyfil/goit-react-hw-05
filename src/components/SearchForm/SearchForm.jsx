import toast from 'react-hot-toast'
import css from './SearchForm.module.css'

const SearchForm = ({ onSearch }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const query = form.elements.query.value.trim()

        if(!query) {
            toast.error("Fill the search form!", {position:'top-center'})
        }

        onSearch(query)
        form.reset()
    }

  return (
    <>
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            name='query'
            placeholder='search movie'
            />
            <button type='submit'>Search</button>
        </form>
    </>
  )
}

export default SearchForm