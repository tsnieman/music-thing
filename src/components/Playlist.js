/** @jsx jsx */
import { jsx, Box, Text } from 'theme-ui'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : undefined,

  // styles we need to apply on draggables
  ...draggableStyle,
})

const Playlist = () => (
  <DragDropContext onDragEnd={console.log}>
    <Droppable droppableId="droppable" ignoreContainerClipping mode="virtual">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          sx={{
            // Specificity hack
            '& > * + *[class]': {
              borderTop: 0,
            },
          }}
        >
          {Array(45)
            .fill(0)
            .map((i, index) => (
              <Draggable
                key={String(index)}
                draggableId={String(index)}
                index={index}
              >
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
                      border: '1px solid',
                      borderColor: 'border',

                      '&:hover': {
                        // TODO why doesn't `muted` work here?
                        background: 'muted',
                      },
                    }}
                  >
                    <Text sx={{ fontWeight: 'bold' }}>{index}. Song</Text>

                    <Text sx={{ fontSize: 1 }}>Artist name</Text>
                  </Box>
                )}
              </Draggable>
            ))}
        </div>
      )}
    </Droppable>
  </DragDropContext>
)

export default Playlist
