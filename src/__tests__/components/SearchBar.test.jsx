import { create } from 'react-test-renderer';
import React from 'react';
import SearchBar from '../../components/SearchBar';

describe('SearchBar', () => {
    const tree = create(<SearchBar />);
    const instance = tree.root;

    it('has an input box.', () => {
        const inputBox = instance.findAll((el) => el.type === "input");
        expect(inputBox).toHaveLength(1);
    });
});