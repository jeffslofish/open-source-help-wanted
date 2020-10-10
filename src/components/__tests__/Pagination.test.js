import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from '../Pagination';

describe('Pagination', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Pagination
          currentPage={5}
          totalCount={100}
          resultsPerPage={20}
          prevlickHandler={jest.fn()}
          nextClickHandler={jest.fn()}
        />
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        style={
          Object {
            "textAlign": "center",
            "width": "100%",
          }
        }
      >
        <button
          onClick={[MockFunction]}
          style={
            Object {
              "display": "inline-block",
              "marginRight": "20px",
            }
          }
        >
          Prev
        </button>
        <p
          className="total-count"
          style={
            Object {
              "display": "inline-block",
            }
          }
        >
          Displaying Page 
          5
           of 
          6
        </p>
        <button
          onClick={[MockFunction]}
          style={
            Object {
              "display": "inline-block",
              "marginLeft": "20px",
            }
          }
        >
          Next
        </button>
      </div>
    `);
  });
});
