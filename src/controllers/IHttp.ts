import { NextFunction, Request, Response } from 'express'

export interface IRequest extends Request {}
export interface INext extends NextFunction {}
export interface IResponse extends Response {}
