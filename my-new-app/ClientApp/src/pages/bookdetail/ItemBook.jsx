import React, { Component } from 'react'

export default class itemBook extends Component {

    render() {
        const itembooks = this.props.Book;
        return (
            <div className="itemBook">
                <table className="table table-dark">
                    <thead>



                        <tr>
                            <th scope="col">stt</th>
                            <th scope="col">id</th>

                            <th scope="col">name</th>
                            <th scope="col">price</th>
                            <th scope="col">author</th>
                            <th scope="col">genrer</th>
                            <th scope="col">created</th>
                            <th scope="col">Actions</th>
                        </tr>



                    </thead>
                    <tbody>
                        {itembooks.map(item => (
                            <tr>
                                <th scope="row">stt</th>
                                <td>{item.id}</td>
                                <td>{item.nameBook}</td>
                                <td>{item.price}</td>
                                <td>{item.genrer}</td>
                                <td>{item.publisher}</td>
                                <td>{item.created}</td>
                                <td> <a href="#" onClick={this.remove}> Delete</a>
                                 |  <a href="#"> Edit</a></td>
                            </tr>


                        ))
                        }
                    </tbody>
                </table>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Standard" />
                    <TextField id="filled-basic" label="Filled" variant="filled" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                </form>
            </div>
        )
    }
}
