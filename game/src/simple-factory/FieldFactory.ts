import { IField, IFieldParams } from 'atari-monk-ball-game-lib-api'
import {
  Field,
  FieldModel,
  FieldRenderer,
  BasicRenderer,
} from 'atari-monk-ball-game-lib'

export class FieldFactory {
  private _field: IField

  public get field() {
    return this._field
  }

  constructor(data: IFieldParams) {
    try {
      this._field = new Field(
        new FieldModel(data),
        new FieldRenderer(new BasicRenderer())
      )
    } catch (error) {
      console.error('Error creating field:', error)
      throw error
    }
  }
}
