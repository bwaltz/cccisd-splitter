# cccisd-splitter

cccisd-splitter provides you with a split pane that can be resized showing
more or less of each pane. Similar to jsfiddle.

## Installation

Run this command:

    npm install cccisd-splitter

## Usage
        render() {
            return (
                <Splitter 
                    direction="horizontal" 
                    minSizeFirst={100} 
                    minSizeSecond={100}
                    gutterSize={15}
                    containerBackground="#eeeeee"
                    defaultSizeFirst={50}
                    paneBackground="#ffffff"
                    name="mysplitter"
                >
                    <div>This is my awesome content for pane1!</div>
                    <MyAwesomeReactCompontent />
                </Splitter>
            );
        },
  

### Props
**gutterSize** - (type: integer, default: 10)<br>
the size of the gutter

**minSizeFirst** - (type: integer, default: 100)<br>
the min size of the first (top or left) pane

**minSizeSecond** - (type: integer, default: 100)<br>
the min size of the second (bottom or right) pane

**snapOffset** - (type: integer, default: 30)<br>
the number of pixels before the minSize to start snap

**direction** - (type: string, default: "horizontal")<br>
direction of the split pane (vertical|horizontal)

**containerBackground** - (type: string, default: "#eee")<br>
container color

**defaultSizeFirst** - (type: integer, default: 50)<br>
starting size (a percentage) of the first (top or left) pane

**paneBackground** - (type: string, default: "#fff")<br>
background color of the panes

