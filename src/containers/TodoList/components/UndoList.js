import React, { Component } from 'react';

class UndoList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { list, deleteItem, changeStatus, handleBlur, valueChange } = this.props;
        return (
            <div className="undo-list">
                <div className="undo-list-title">
                    正在进行
                    <div className="undo-list-count" data-test="count">
                        {list.length}
                    </div>
                </div>
                <ul className="undo-list-content">
                    {list.map((item, index) => {
                        return (
                            <li
                                className="undo-list-item"
                                data-test="list-item"
                                key={`${item}-${index}`}
                                onClick={() => changeStatus(index)}
                            >
                                {item.status === 'div' ? (
                                    item.value
                                ) : (
                                    <input
                                        className="undo-list-item-input"
                                        data-test="input"
                                        value={item.value}
                                        onBlur={() => handleBlur(index)}
                                        onChange={(e) => valueChange(index, e.target.value)}
                                    />
                                )}
                                <div
                                    className="undo-list-delete"
                                    data-test="delete-item"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteItem(index);
                                    }}
                                >
                                    -
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default UndoList;
