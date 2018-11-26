import React, {Component} from 'react'
import './App.css'
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf.js";

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

	/*getShelfOrder(allBooks){
		return {
			'Currently Reading': this.getBooksByShelf(allBooks, 'currentlyReading'),
			'Want To Read': this.getBooksByShelf(allBooks, 'wantToRead'),
			'Read': this.getBooksByShelf(allBooks, 'read')
		}
	}*/


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


export default BookRack
