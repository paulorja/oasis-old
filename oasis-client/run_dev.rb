ENV['RACK_ENV'] = 'development'
ENV['WS_URL'] = 'ws://localhost:5000'

require 'sinatra'
set :environment, ENV['RACK_ENV']
set :public_folder, File.dirname(__FILE__) + '/' + ENV['RACK_ENV']
get '/' do
  erb :index
end