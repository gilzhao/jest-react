// 使用 Enzyme
import React from 'react';
import { shallow } from 'enzyme';
import TodoList from '../../index';

describe('TodoList 组件', () => {
    it('初始化列表为空', () => {
        const wrapper = shallow(<TodoList />);
        expect(wrapper.state('undoList')).toEqual([]);
    });

    it('Header 组件存在 addUndoItem 属性', () => {
        const wrapper = shallow(<TodoList />);
        const Header = wrapper.find('Header');
        // expect(Header.prop('addUndoItem')).toBe(wrapper.instance().addUndoItem);
        expect(Header.prop('addUndoItem')).toBeTruthy();
    });

    it('addUndoItem 方法被调用，undoList 数据项增加', () => {
        // const wrapper = shallow(<TodoList />);
        // const Header = wrapper.find('Header');  // 和 header 做耦合，写的不好，像集成测试
        // const addFunc = Header.prop('addUndoItem')
        // addFunc('learn jest')
        // expect(wrapper.state('undoList').length).toBe(1);
        // expect(wrapper.state('undoList')[0]).toBe('learn jest')
        // addFunc('learn jest2')
        // expect(wrapper.state('undoList').length).toBe(2);

        const wrapper = shallow(<TodoList />);
        const { addUndoItem } = wrapper.instance();
        const inputText = 'learn react';
        addUndoItem(inputText);
        expect(wrapper.state('undoList').length).toBe(1);
        expect(wrapper.state('undoList')[0]).toBe(inputText);
        addUndoItem(inputText);
        expect(wrapper.state('undoList').length).toBe(2);
    });

    it('UndoList 组件应该接受 list 和 deleteItem 两个参数', () => {
        const wrapper = shallow(<TodoList />);
        const UndoList = wrapper.find('UndoList');
        expect(UndoList.prop('list')).toBeTruthy();
        expect(UndoList.prop('deleteItem')).toBeTruthy();
    });

    it('deleteItem 方法被调用时，undoList 数据项被删除', () => {
        const wrapper = shallow(<TodoList />);
        const data = ['learn jest', 'TDD', 'enzyme'];
        wrapper.setState({
            undoList: data,
        });

        wrapper.instance().deleteItem(1);
        expect(wrapper.state('undoList')).toEqual([data[0], data[2]]);
    });
});
