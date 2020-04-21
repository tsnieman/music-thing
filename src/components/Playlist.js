/** @jsx jsx */
import * as React from 'react'
import { jsx, Box, Text } from 'theme-ui'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `track-${k}`,
    title: `Trackname ${k}`,
    artist: `Artist name`,
  }))

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : undefined,

  // styles we need to apply on draggables
  ...draggableStyle,
})

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const Playlist = () => {
  const [items, setItems] = React.useState(getItems(100))

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const newOrder = reorder(
      items,
      result.source.index,
      result.destination.index
    )

    setItems(newOrder)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              // Specificity hack
              '& > * + *[class]': {
                borderTop: 0,
              },
            }}
          >
            {items.map(({ id, title, artist }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                    sx={{
                      py: 1,
                      px: 2,
                      border: '1px solid',
                      borderColor: 'border',

                      '&:hover': {
                        // TODO why doesn't `muted` work here?
                        background: 'muted',
                      },
                    }}
                  >
                    <Text sx={{ fontWeight: 'bold' }}>
                      {index}. {title}
                    </Text>

                    <Text sx={{ fontSize: 1 }}>{artist}</Text>
                  </Box>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Playlist
