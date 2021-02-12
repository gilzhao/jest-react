// 使用 Enzyme
import React from 'react';
import { mount } from 'enzyme';
import TodoList from '../../index';
import { findTestWrapper } from '../../../../utils/testUtils';

it(`
  1. 输入框输入内容
  2. 点击回车
  3. 列表中展示用户输入的内容项
`, () => {
    const wrapper = mount(<TodoList />);
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
