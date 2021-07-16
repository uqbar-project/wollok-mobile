import { Module } from 'wollok-ts/dist/model';

export type Kind = Module['kind']

export class Entity {
    constructor(
        public readonly name: string,
        public readonly kind: Kind
    ){ }
}