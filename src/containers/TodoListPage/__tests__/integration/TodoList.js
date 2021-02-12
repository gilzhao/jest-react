// 使用 Enzyme
import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import TodoList from '../../index';
import { findTestWrapper } from '../../../../utils/testUtils';
import store from '../../../../store/createStore';

beforeEach(() => {
    axios.success = true;
});

it(`
  1. 输入框输入内容
  2. 点击回车
  3. 列表中展示用户输入的内容项
`, () => {
    const wrapper = mount(
        <Provider store={store}>
            <TodoList />
        </Provider>
    );
    const inputElem = findTestWrapper(wrapper, 'header-input');
    const content = 'learn jest';
    inputElem.simulate('change', {
        target: { value: content },
    });
    inputElem.simulate('keyUp', {
        keyCode: 13,
    });
    const listItems = findTestWrapper(wrapper, 'list-item');
    expect(listItems.length).toEqual(1);
    expect(listItems.text()).toContain(content);
});

it(`
  1. 用户打开页面，请求正常
  2. 应该展示接口返回的数据
`, (done) => {
    const wrapper = mount(
        <Provider store={store}>
            <TodoList />
        </Provider>
    );

    // 等同于 setTimeout 为 0
    process.nextTick(() => {
        wrapper.update();
        console.log(wrapper.debug());
        const listItems = findTestWrapper(wrapper, 'list-item');
        expect(listItems.length).toBe(1);
        done();
    });
});

it(`
  1. 用户打开页面，请求不正常
  2. 页面无列表类容，应该能把页面展示出来
`, (done) => {
    axios.success = false
    const wrapper = mount(
        <Provider store={store}>
            <TodoList />
        </Provider>
    );

    // 等同于 setTimeout 为 0
    process.nextTick(() => {
        wrapper.update();
        console.log(wrapper.debug());
        const listItems = findTestWrapper(wrapper, 'list-item');
        expect(listItems.length).toBe(0);
        done();
    });
});
