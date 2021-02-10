// 使用 Enzyme
import React from 'react';
import { shallow } from 'enzyme';
import TodoList from '../../index';

it('TodoList 初始化列表为空', () => {
    const wrapper = shallow(<TodoList />);
    expect(wrapper.state('undoList')).toEqual([]);
});

it('TodoList 应该给 Header 传递一个增加 undoList 内容的方法', () => {
    const wrapper = shallow(<TodoList />);
    const Header = wrapper.find('Header');
    // expect(Header.prop('addUndoItem')).toBe(wrapper.instance().addUndoItem);
    expect(Header.prop('addUndoItem')).toBeTruthy();
});

it('当 addUndoItem 被执行时，undoList 应该新增内容', () => {
    // const wrapper = shallow(<TodoList />);
    // const Header = wrapper.find('Header');  // 和 header 做耦合，写的不好，像集成测试
    // const addFunc = Header.prop('addUndoItem')
    // addFunc('learn jest')
    // expect(wrapper.state('undoList').length).toBe(1);
    // expect(wrapper.state('undoList')[0]).toBe('learn jest')
    // addFunc('learn jest2')
    // expect(wrapper.state('undoList').length).toBe(2);

    const wrapper = shallow(<TodoList />);
    const inputText = 'learn react';
    wrapper.instance().addUndoItem(inputText);
    expect(wrapper.state('undoList').length).toBe(1);
    expect(wrapper.state('undoList')[0]).toBe(inputText);
    wrapper.instance().addUndoItem(inputText);
    expect(wrapper.state('undoList').length).toBe(2);
});

it('TodoList 应该给未完成列表传递 list 数据，以及 deleteItem 方法', () => {
    const wrapper = shallow(<TodoList />);
    const UndoList = wrapper.find('UndoList');
    expect(UndoList.prop('list')).toBeTruthy();
    expect(UndoList.prop('deleteItem')).toBeTruthy();
});

it('当 deleteItem 方法被执行时，undoList 应该删除内容', () => {
    const wrapper = shallow(<TodoList />);
    wrapper.setState({
        undoList: ['learn jest', 'TDD', 'enzyme'],
    });

    wrapper.instance().deleteItem(1);
    expect(wrapper.state('undoList')).toEqual(['learn jest', 'enzyme']);
});
