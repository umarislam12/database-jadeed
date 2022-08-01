import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
interface Props {
    inverted?: boolean;
    content?: string;
}
export default function LoadingComponent({ inverted = true, content = "loading" }: Props) {
    return (
        <Dimmer inverted={inverted} active={true}>
            <Loader content={content} />
        </Dimmer>
    )
};