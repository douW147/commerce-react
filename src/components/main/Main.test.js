import React, {useEffect} from 'react'
import {render, fireEvent} from '@testing-library/react'
import Main from './Main'


test('creates main component', () => {
    const component = render(<Main/>)
    expect(component).toBeTruthy()
});
