import {registerEnumType} from "@nestjs/graphql";

export enum pushMovieToType{
    liked = 'liked',
    disliked = 'disliked',
    saved = 'saved',
    skipped = 'skipped'
}

registerEnumType(pushMovieToType, {name: 'pushMovieToType'})
