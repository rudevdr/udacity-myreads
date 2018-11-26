import React, {Component} from 'react'
import './App.css'
import * as BooksAPI from "./BooksAPI";

class BookRack extends Component {

	constructor(){
		super()
		this.state = {
			/**
			 * TODO: Instead of using this state variable to keep track of which page
			 * we're on, use the URL in the browser's address bar. This will ensure that
			 * users can use the browser's back and forward buttons to navigate between
			 * pages, as well as provide a good URL they can bookmark and share.
			 */
			//		showSearchPage: false,
			books : []
		}}

	getBooksByShelf(shelf) {
		return this.state.books.filter(book => book.shelf === shelf);
	}

    componentWillMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books: books});
        });
    }


	render(){
		return (
			<div className="app">
				<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>
					<div className="list-books-content">
						<div>
							<BookShelf name="Currently Reading" books={this.getBooksByShelf('currentlyReading')}/>
							<BookShelf name="Want To Read" books={this.getBooksByShelf('wantToRead')}/>
							<BookShelf name="Read" books={this.getBooksByShelf('read')}/>
						</div>
					</div>
					<div className="open-search">
						<button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
					</div>
				</div>
			</div>
		)}
}

const BookShelf = (props) => (
	<div className="bookshelf">
		<h2 className="bookshelf-title">{props.name}</h2>
		<div className="bookshelf-books">
			<ol className="books-grid">
				{props.books.map((book) => (
				<li>
					<div className="book">
						<div className="book-top">
							<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")`}}></div>
							<div className="book-shelf-changer">
								<select>
									<option value="move" disabled>Move to...</option>
									<option value="currentlyReading">Currently Reading</option>
									<option value="wantToRead">Want to Read</option>
									<option value="read">Read</option>
									<option value="none">None</option>
								</select>
							</div>
						</div>
						<div className="book-title">{book.title}</div>
						<div className="book-authors">{book.author}</div>
					</div>
				</li>
				))}
			</ol>
		</div>
	</div>
	)

export default BookRack
