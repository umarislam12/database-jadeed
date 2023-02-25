import React from 'react'
import { Grid, Search } from 'semantic-ui-react'

const initialState = {
    loading: false,
    results: [],
    value: '',
  }
const SearchBar = () => {
  return (
//     <Grid>
//     <Grid.Column width={6}>

      <Search
       
        placeholder='Search...'
       
         
       
      />
//     </Grid.Column>

//     <Grid.Column width={10}>
//       <Segment>
//         <Header>State</Header>
//         <pre style={{ overflowX: 'auto' }}>
//           {JSON.stringify({ loading, results, value }, null, 2)}
//         </pre>
//         <Header>Options</Header>
//         <pre style={{ overflowX: 'auto' }}>
//           {JSON.stringify(source, null, 2)}
//         </pre>
//       </Segment>
//     </Grid.Column>
//   </Grid>
  )
}

export default SearchBar