import Html exposing (..)
import Html.Attributes exposing (..)

import Time exposing (Time, second)

--import Bootstrap

main: Program Never Model Msg
main =
  Html.program {
    init = init,
    view = view,
    update = update,
    subscriptions = subscriptions
  }

type alias Model = {
  data: Int --Bootstrap.Model
}

type alias Msg = Int --Bootstrap.Msg

init: (Model, Cmd Msg)
init =
  {-let
    (data, cmd) = Bootstrap.init
  in-}
    (Model 0, Cmd.none)

subscriptions: Model -> Sub Msg
subscriptions model =
  --Bootstrap.subscriptions model.data
  Time.every second (\_-> model.data)

update: Msg -> Model -> (Model, Cmd Msg)
update msg model =
  {-let
    (data, cmd) = Bootstrap.update msg model.data
  in-}
    (,) {model | data = model.data + 1} Cmd.none

view: Model -> Html Msg
view model =
  div []
    [
      div [id "wrapper"]
        [
          div [class "header"] [],
          div [id "slide-container"] [{-Bootstrap.view model.data-}]
        ]
      ]
