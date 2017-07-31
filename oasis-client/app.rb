require 'sinatra'

set :environment, ENV['RACK_ENV']
set :public_folder, File.dirname(__FILE__) + '/' + ENV['RACK_ENV']

get '/' do
  erb :index
end